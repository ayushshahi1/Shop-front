
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import UpdateForm from "./UpdateForm";
import { orders } from "../../dummy/order";
import { useNavigate } from "react-router";
import { useOrderByUserQuery } from "../../features/orderApi";
import { useSelector } from "react-redux";



const UserProfile = () => {

  const TABLE_HEAD = ["OrderId", "Total Price", "Date", ""];

  const nav = useNavigate();

  const { user } = useSelector((store) => store.user);

  const { isLoading, isError, data: orders } = useOrderByUserQuery(user.token);

  console.log(orders);

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <div className="grid grid-cols-3 gap-9 px-4 py-4">

      <div>
        <UpdateForm />
      </div>


      <div>
        <Card className="h-full w-full min-w-max table-auto   col-span-2 shadow-2xl">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(({ _id, totalPrice, createdAt }, index) => {
                const isLast = index === orders.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {totalPrice}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {createdAt}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <button onClick={() => nav(`/user/order/${_id}`)}>  <Typography as="a" variant="small" color="blue" className="font-medium">
                        Detail..
                      </Typography>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

    </div>
  )
}
export default UserProfile