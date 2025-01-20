
export const RestaurantOrder = ({order}) => {
    return (
        <div key={order.id} className="group rounded-xl flex flex-col p-4 bg-blue-100 ">
            <h2 className="text-lg font-bold text-gray-800">Para {order.client}</h2>
            <div className="text-gray-700">
                <b>{order.price}€ </b>
                - {order.totalDishes} plato{order.totalDishes > 1 ? "s" : ""}
            </div>

            <div className="flex bg-white p-4 flex-col rounded gap-1 mt-4 text-gray-700">
                <h3 className="text-gray-800 font-bold">Platos</h3>
                {order.dishes.map(dish => (
                    <span key={dish.id} className="">{dish.quantity}x {dish.name}</span>
                ))}
            </div>
        </div>
    )
}