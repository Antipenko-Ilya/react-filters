import faker from 'faker/locale/ru';
import moment, { Moment } from 'moment';

type sizeType = "S" | "M" | "L" | "XL";
type typesType = "Верхняя одежда" | "Белье" | "Штанишки" | "Ботинки" | "Головные уборы";

type Product = {
    id: number;
    name: string;
    type: typesType;
    color: string;
    size: sizeType;
    inStock: boolean;
    dateReceipt: Moment;
}

const sizes: sizeType[] = ["S", "M", "L", "XL"];
const types: typesType[] = ["Верхняя одежда", "Белье", "Штанишки", "Ботинки", "Головные уборы"];

export function generateData(count = 100) {
    const products: Product[] = [];
    for(let i = 0; i < count; i++) {
        products.push({
            id: faker.random.number(),
            name: faker.name.jobTitle(),
            color: faker.internet.color(),
            inStock: faker.random.boolean(),
            type: types[faker.random.number() % 5],
            size: sizes[faker.random.number() % 4],
            dateReceipt: moment(faker.date.past())
        });
    }
    return products;
}
