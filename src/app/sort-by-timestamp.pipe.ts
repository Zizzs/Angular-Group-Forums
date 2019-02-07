import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTimestamp'
})
export class SortByTimestampPipe implements PipeTransform {

  transform(input: any[]): any {
    let toSort = input.slice(0);
    return toSort.sort((a, b) => b.timestamp - a.timestamp)
  }

}
