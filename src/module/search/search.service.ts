import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigSearch } from './config/search.config';
import { ISearchService } from './interface/search.interface';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService
  extends ElasticsearchService
  implements ISearchService<any>
{
  constructor() {
    super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
  }

  public async insertIndex(bulkData: any): Promise<any> {
    console.log('🐔 =>  bulkData:', bulkData);
    return this.bulk(bulkData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async updateIndex(updateData: any): Promise<any> {
    return this.update(updateData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async searchIndex(searchData: any): Promise<any> {
    return this.search(searchData)
      .then((res: any) => {
        return res.body.hits.hits;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteIndex(indexData: any): Promise<any> {
    return this.indices
      .delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteDocument(indexData: any): Promise<any> {
    return this.delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
