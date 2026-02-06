import { Document, SearchParams, APIResponse } from '../../types';
import { generateId, cleanText, chunkText, formatDate } from '../../utils/textProcessing';

const BASE_URL = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search';

export async function searchEuropePMC(params: SearchParams): Promise<APIResponse> {
  try {
    const query = encodeURIComponent(params.keywords);
    const pageSize = Math.min(params.maxResults || 20, 100);

    const url = `${BASE_URL}?query=${query}&format=json&pageSize=${pageSize}&sort=cited:desc`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Europe PMC API error: ${response.status}`);
    }

    const data = await response.json();
    const documents: Document[] = [];

    if (data.resultList?.result && Array.isArray(data.resultList.result)) {
      for (const item of data.resultList.result) {
        const title = item.title || 'Untitled';
        const abstract = item.abstractText || '';

        if (!title || !abstract) continue;

        const authors = item.authorString?.split(', ') || [];

        const dateStr = item.firstPublicationDate
          ? formatDate(item.firstPublicationDate)
          : formatDate(new Date());

        if (params.dateTo && dateStr > params.dateTo) continue;
        if (params.dateFrom && dateStr < params.dateFrom) continue;

        const fullText = `${title}. ${abstract}`;

        const doc: Document = {
          id: generateId(),
          title: cleanText(title),
          authors,
          date: dateStr,
          doi: item.doi,
          url: item.doi ? `https://doi.org/${item.doi}` : `https://europepmc.org/article/${item.source}/${item.id}`,
          language: 'en',
          source: 'EuropePMC',
          abstract: cleanText(abstract).substring(0, 500),
          full_text_chunks: chunkText(fullText, 1000, 200),
          files: item.fullTextUrlList?.fullTextUrl?.filter((f: any) => f.documentStyle === 'pdf').map((f: any) => ({
            type: 'PDF',
            url: f.url
          })),
          created_at: new Date().toISOString()
        };

        documents.push(doc);
      }
    }

    return {
      success: true,
      documents,
      source: 'EuropePMC'
    };
  } catch (error) {
    console.error('Europe PMC search error:', error);
    return {
      success: false,
      documents: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      source: 'EuropePMC'
    };
  }
}
