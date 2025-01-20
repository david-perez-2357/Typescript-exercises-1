import {ExerciseContainer} from "../components/ExerciseContainer.jsx";
import {useState} from "react";
import {RestaurantOrder} from "../components/restaurantOrder.jsx";

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
        this.price = dishes.reduce((acc, dish) => acc + dish.price * dish.quantity, 0);
    }

    addDish(dish) {
        if (this.dishes.find(d => d.id === dish.id)) {
            this.dishes.find(d => d.id === dish.id).quantity++;
        }else {
            this.dishes.push(dish);
        }
        this.price += dish.price;
    }

    get totalDishes() {
        return this.dishes.reduce((acc, dish) => acc + dish.quantity, 0);
    }
}

class Restaurant {
    constructor(orderList) {
        this.orderList = orderList;
    }

    get totalSales() {
        return this.orderList.reduce((acc, order) => acc + order.price, 0);
    }

    addOrder(order) {
        this.orderList.push(order);
        console.log(this.orderList)
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
    const [restaurantOrders, setRestaurantOrders] = useState(restaurant.orderList);
    const [clientSearch, setClientSearch] = useState("");
    const [priceFilter, setPriceFilter] = useState(0);

    const [filteredOrders, setFilteredOrders] = useState(restaurant.orderList);

    function addDishToOrder(dishId) {
        console.log(restaurant.orderList.length);
        if (!dishId) {
            console.error("El ID del plato no es válido.");
            return;
        }

        const updatedOrder = new Order(
            restaurant.orderList.length + 1,
            newOrder.client,
            [...newOrder.dishes]
        );

        // Buscar el plato por su ID
        const dish = allDishes.find(d => d.id === parseInt(dishId, 10));
        if (!dish) {
            console.error("Plato no encontrado.");
            return;
        }

        // Agregar el plato a la orden
        updatedOrder.addDish(new Dish(dish.id, dish.name, dish.price, 1));

        // Actualizar el estado global de la orden
        setNewOrder({ ...updatedOrder });

        console.log(restaurant.orderList.length);
    }


    function addNewOrder() {
        setNewOrderSent(true);

        if (!newOrder.client || newOrder.dishes.length === 0) {
            console.warn("La orden no es válida. Asegúrate de que tenga cliente y platos.");
            return;
        }

        const newOrderInstance = new Order(
            restaurant.orderList.length + 1,
            newOrder.client,
            [...newOrder.dishes]
        );
        restaurant.orderList = [...restaurantOrders, newOrderInstance];

        // Actualizar los estados relacionados
        setNewOrder(new Order(restaurant.orderList.length + 1, "", []));
        setBenefit(restaurant.totalSales);
        setNewOrderSent(false);
        setRestaurantOrders([...restaurantOrders, newOrderInstance]);
        setFilteredOrders([...restaurantOrders, newOrderInstance]);
    }

    function filterOrders(clientSearch, priceFilter) {
        setClientSearch(clientSearch);
        setPriceFilter(priceFilter);

        const filtered = restaurantOrders.filter(order => {
            return order.client.toLowerCase().includes(clientSearch.toLowerCase()) && order.price >= priceFilter;
        });
        setFilteredOrders(filtered);
    }

    function resetFilters() {
        setClientSearch("");
        setPriceFilter(0);
        setFilteredOrders(restaurantOrders);
    }


    return (
        <ExerciseContainer exerciseNumber="2">
            <h1 className="text-2xl text-gray-800 font-bold">Restaurante</h1>
            <p className="m-0 text-gray-600" id="ratingAvg">{benefit}€ de beneficio</p>

            <div className="mt-5 rounded-xl justify-center relative w-full  bg-gray-50 flex-wrap p-6 flex items-center gap-x-16 gap-y-8">
                <h2 className="text-xl font-bold -top-4 text-gray-800 absolute w-full text-center">Añadir pedido</h2>
                <div className="grid grid-cols-2 w-full max-w-[800px] gap-3">
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

                <div className={"w-full flex mt-4 flex-col gap-1 max-w-[500px]" + (newOrder.dishes.length === 0 ? " hidden" : "")}>
                    <label htmlFor="order" className="text-lg text-gray-900 text-center w-full">Cuenta</label>
                    <div id="order" className="flex flex-col gap-2">
                        {newOrder.dishes.map(dish => (
                            <div key={dish.id} className="flex text-gray-800 justify-between">
                                <span>{dish.quantity}x {dish.name}</span>
                                <span>{dish.price * dish.quantity}€</span>
                            </div>
                        ))}

                        <div className="flex items-center border-t-2 pt-3 justify-between mt-3">
                            <div className={"flex gap-4"}>
                                <span>Total: </span>
                                <b>{newOrder.price}€</b>
                            </div>

                            <button
                                className="bg-blue-500 max-w-96 text-white p-2 rounded-md hover:bg-blue-600 transition-all focus:outline-none"
                                onClick={() => addNewOrder()}>
                                Añadir pedido
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <h2 className="text-xl font-bold mt-8 mb-2 text-gray-800">Pedidos</h2>
            <div className="grid gap-5 grid-cols-[300px_1fr]">
                <aside className="bg-gray-50 rounded p-5 flex flex-col gap-10 pt-10">
                    <div>
                        <label htmlFor="search" className="text-gray-800 text-lg">Cliente</label>
                        <input type="text" id="search" className="w-full p-2 bg-gray-200 rounded-md px-3 focus:outline-none" onInput={e => filterOrders(e.target.value, priceFilter)} value={clientSearch}/>
                    </div>

                    <div>
                        <label htmlFor="price" className="text-gray-800 text-lg">Precio minimo: {priceFilter}</label>
                        <input type="range" id="price" min="0"  className="w-full h-5" onChange={e => filterOrders(clientSearch, e.target.value)} value={priceFilter}/>
                    </div>

                    <button className="border-2 border-blue-400 text-blue-500 p-2 rounded-md hover:bg-blue-500 hover:text-white transition-all focus:outline-none" onClick={() => resetFilters()}>Limpiar filtros</button>
                </aside>

                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
                    {filteredOrders.map(order => (
                        <div>
                            <RestaurantOrder key={order.id} order={order}/>
                        </div>
                    ))}

                    {filteredOrders.length === 0 && (
                        <div className="ms-4 text-gray-800 text-xl">
                            No se encontraron pedidos.
                        </div>
                    )}
                </div>
            </div>

        </ExerciseContainer>
    )
}