import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'styleArray'
})
export class StyleArrayPipe implements PipeTransform {

  transform(value: any): any {
    return this.applyProps(value)
  }

  private applyProps(props: any): string {
    try {

      const { style } = props
      const keyValue = Object.entries(style)
      const parse = keyValue.map(([key, value]) => {
        return `${key}:${value}`
      }).join(';').toString()

      console.log('--->', parse);

      return parse
    } catch (e) {
      return ''
    }

  }

}
