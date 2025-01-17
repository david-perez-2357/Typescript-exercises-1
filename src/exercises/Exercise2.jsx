import {ExerciseContainer} from "../components/ExerciseContainer.jsx";
import {useState} from "react";

class Dish {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class Order {
    constructor(id, client, dishes) {
        this.id = id;
        this.client = client;
        this.dishes = dishes;
        this.price = dishes.reduce((acc, dish) => acc + dish.price, 0);
    }

    get totalDishes() {
        return this.dishes.length;
    }

    addDish(dish) {
        if (this.dishes.find(d => d.id === dish.id)) {
            this.dishes.find(d => d.id === dish.id).quantity++;
        }else {
            this.dishes.push(dish);
        }
        this.price += dish.price;
    }
}

class Restaurant {
    constructor(orderList) {
        this.orderList = orderList;
    }

    get totalOrders() {
        return this.orderList.length;
    }

    get totalSales() {
        return this.orderList.reduce((acc, order) => acc + order.price, 0);
    }

    set setOrders(value) {
        this.orderList = value;
    }

    set addOrder(order) {
        this.orderList.push(order);
    }
}

export const Exercise2 = () => {
    const dish1 = new Dish(1, "Milanesa con papas", 20, 1);
    const dish2 = new Dish(2, "Pizza", 12, 1);
    const dish3 = new Dish(3, "Ensalada", 10, 1);
    const dish4 = new Dish(4, "Hamburguesa", 15, 1);
    const dish5 = new Dish(5, "Lomito", 25 ,1);

    const allDishes = [dish1, dish2, dish3, dish4, dish5];

    const order1 = new Order(1, "Juan", [dish1, dish2]);
    const order2 = new Order(2, "Pedro", [dish3, dish4, dish5]);
    const order3 = new Order(3, "Maria", [dish1, dish5]);
    const order4 = new Order(4, "Ana", [dish2, dish3, dish4]);
    const order5 = new Order(5, "Jose", [dish1, dish2, dish3, dish4, dish5]);

    const restaurant = new Restaurant([order1, order2, order3, order4, order5]);

    // Add a new order
    const [dishSelected, setDishSelected] = useState(dish1.id);
    const [newOrderSent, setNewOrderSent] = useState(false);
    const [benefit, setBenefit] = useState(restaurant.totalSales);
    const [newOrder, setNewOrder] = useState(new Order(restaurant.orderList.length + 1, "", []));

    function addDishToOrder(dishId) {
        const order = new Order(newOrder.id, newOrder.client, [...newOrder.dishes]);
        const dish = allDishes.find(dish => dish.id === parseInt(dishId));
        order.addDish(new Dish(dish.id, dish.name, dish.price, 1));
        setNewOrder({...order});
    }

    function addNewOrder() {
        setNewOrderSent(true);
        if (!newOrder.client || newOrder.dishes.length === 0) return;
        restaurant.addOrder = new Order(newOrder.id, newOrder.client, [...newOrder.dishes]);;
        setNewOrder(new Order(restaurant.orderList.length + 1, "", []));
        setBenefit(restaurant.totalSales);
        setNewOrderSent(false);
    }

    return (
        <ExerciseContainer exerciseNumber="2">
            <h1 className="text-2xl text-gray-800 font-bold">Restaurante</h1>
            <p className="m-0 text-gray-600" id="ratingAvg">{benefit}€ de beneficio</p>

            <div className="mt-5 rounded-xl border-4 border-gray-100 p-4 flex flex-col gap-5">
                <h2 className="text-xl font-bold text-gray-800">Añadir pedido</h2>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="client" className="text-gray-900">Cliente</label>
                            <input type="text" id="client"
                                   value={newOrder.client}
                                      onChange={e => setNewOrder({...newOrder, client: e.target.value})}
                                   className={"w-full p-2 rounded-md bg-gray-200 px-3 focus:outline-none" + (newOrderSent && !newOrder.client ? " border-2 border-red-500" : "")}
                            />
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-5 content-center">
                            <div>
                                <label htmlFor="dishes" className="text-gray-900">Platos</label>
                                <select id="dishes"
                                        value={dishSelected}
                                        onChange={e => setDishSelected(e.target.value)}
                                        className={"w-full p-2 rounded-md bg-gray-200 px-3 focus:outline-none" + (newOrderSent && newOrder.dishes.length === 0 ? " border-2 border-red-500" : "")}>
                                    {allDishes.map(dish => <option key={dish.id} value={dish.id}>{dish.name}</option>)}
                                </select>
                            </div>
                            <a className="text-blue-500 select-none mt-4 cursor-pointer underline self-center hover:text-blue-700" onClick={() => addDishToOrder(dishSelected)}>Añadir</a>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="order" className="text-lg text-gray-900">Pedido</label>
                            <div id="order" className="flex flex-col gap-2">
                                {newOrder.dishes.map(dish => (
                                    <div key={dish.id} className="flex text-gray-700 justify-between">
                                        <span>{dish.quantity}x {dish.name}</span>
                                        <span>{dish.price}€</span>
                                    </div>
                                ))}

                                <div className="flex border-t-2 pt-2 justify-between mt-3">
                                    <span>Total</span>
                                    <span>{newOrder.price}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600 transition-all focus:outline-none" onClick={() => addNewOrder()}>
                    Añadir pedido
                </button>
            </div>
        </ExerciseContainer>
    )
}