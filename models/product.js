import GuidGenerator from "../services/guid-generator.js";

export default class Product {
    constructor(name, price, count) {
        this.id = GuidGenerator.getNewGuid();

        this.name = name;
        this.price = price;
        this.count = count;
      }
}