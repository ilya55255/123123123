import { Document, SearchParams, APIResponse } from '../../types';
import { generateId, cleanText, chunkText, formatDate } from '../../utils/textProcessing';

const BASE_URL = 'https://api.base-search.net/cgi-bin/BaseHttpSearchInterface.fcgi';

export async function searchBASE(params: SearchParams): Promise<APIResponse> {
  try {
    const query = encodeURIComponent(params.keywords);
    const hits = Math.min(params.maxResults || 20, 50);

    const url = `${BASE_URL}?func=PerformSearch&query=${query}&hits=${hits}&format=json`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`BASE API error: ${response.status}`);
    }

    const data = await response.json();
    const documents: Document[] = [];

    if (data.response?.docs && Array.isArray(data.response.docs)) {
      for (const item of data.response.docs) {
        const title = item.dctitle?.[0] || item.dctitle || 'Untitled';
        const abstract = item.dcabstract?.[0] || item.dcabstract || item.dcdescription?.[0] || item.dcdescription || '';

        if (!title) continue;

        const authors = item.dccreator || [];

        const dateStr = item.dcdate?.[0] || item.dcdate
          ? formatDate(item.dcdate?.[0] || item.dcdate)
          : formatDate(new Date());

        if (params.dateTo && dateStr > params.dateTo) continue;
        if (params.dateFrom && dateStr < params.dateFrom) continue;

        const fullText = `${title}. ${abstract}`;

        const doc: Document = {
          id: generateId(),
          title: cleanText(title),
          authors: Array.isArray(authors) ? authors : [authors].filter(Boolean),
          date: dateStr,
          doi: item.dcdoi?.[0] || item.dcdoi,
          url: item.dclink?.[0] || item.dclink || item.dcidentifier?.[0] || item.dcidentifier || '',
          language: item.dclang?.[0] || item.dclang || 'en',
          source: 'BASE',
          abstract: cleanText(abstract).substring(0, 500),
          full_text_chunks: chunkText(fullText, 1000, 200),
          created_at: new Date().toISOString()
        };

        documents.push(doc);
      }
    }

    return {
      success: true,
      documents,
      source: 'BASE'
    };
  } catch (error) {
    console.error('BASE search error:', error);
    return {
      success: false,
      documents: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      source: 'BASE'
    };
  }
}
