import { types, Instance } from "mobx-state-tree"
import moment, { Moment } from "moment";



export const momentDate = types.custom<string, Moment>({
    name: "momentDate",
    fromSnapshot(value: string): Moment {
      return moment(value);
    },
    toSnapshot(value: Moment): string {
      return value.toISOString();
    },
    // tslint:disable-next-line:no-any
    isTargetType(v: any) {
      return moment.isMoment(v);
    },
    // tslint:disable-next-line:no-any
    getValidationMessage(v: any) {
      if (moment.isMoment(v)) {
        return "Invalid moment object";
      }
      return "";
    }
});

export type IFilterKey = 'type' | 'color' | 'size' | 'inStock' | 'dateReceipt';
export type IFilterValue =  null | string | boolean | [Moment?, Moment?];