export default class Cart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
        this.totalItemCount = 0;
      }

      addProduct(item){
        var existingItem = this.items.find(x => x.id == item.name);

        if (existingItem){
            existingItem.count += 1;
        } else {
            this.items.push(item);
        }

        this.totalItemCount += item.count;
        this.totalPrice += item.price * item.count;
      }
}
