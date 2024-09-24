// import { addPlaceOrderInfo, placeOrder } from "@/redux/Pos/PlaceOrderSlice";
// import { AppDispatch, RootState } from "@/redux/store";
// import { MdOutlineAccessTime } from "react-icons/md";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import {
//   Button,
//   Box,
//   Flex,
//   HStack,
//   Spacer,
//   Select,
//   Text,
//   Center,
//   Checkbox,
//   VStack,
//   Icon,
// } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeItemFromOrder } from "@/redux/Pos/OrderSlice";

// type Props = {};

// interface OrderDetails {
//   tableNo: number;
//   tableStatus: string;
//   menuItems: {
//     itemName: string;
//     quantity: number;
//     selectedSize: string;
//     sellingPrice: number;
//     ingredients: {
//       name: string;
//       properties: {
//         quantity: number;
//         unit: string;
//       };
//     }[];
//     addOns: {
//       name: string;
//       quantity: number;
//       unit: string;
//       addonPrice: number;
//     }[];
//   }[];
//   preparationTime: number;
//   totalPrice: number;
// }

// const OrderSummery = (props: Props) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
//     {}
//   );
//   const [selectedAddons, setSelectedAddons] = useState<{
//     [key: string]: string[];
//   }>({});
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
//   const [totalPrices, setTotalPrices] = useState<{ [key: string]: number }>({});
//   const [preparationTime, setPreparationTime] = useState<number>(0);

//   // const listOfItems = useSelector((state: RootState) => state.orderInfo);

//   const calculateTotalPrice = () => {
//     const newTotalPrices: { [key: string]: number } = {};
//     listOfItems.orderedItems.forEach((item: { uniqueKey: any; size: any[]; }) => {
//       const itemId = item.uniqueKey;
//       const selectedSize = item.size.find(
//         (s: { sizeName: string; }) => s.sizeName === selectedSizes[itemId]
//       );
//       const sizePrice = selectedSize ? selectedSize.sellingPrice : 0;

//       const addonPrices =
//         selectedAddons[itemId]?.reduce((acc, addonName) => {
//           const addonPrice =
//             selectedSize?.addOns.find((addon: { name: string; }) => addon.name === addonName)
//               ?.addonPrice || 0;
//           return acc + addonPrice;
//         }, 0) || 0;

//       const quantity = quantities[itemId] || 1;
//       const totalPrice = (sizePrice + addonPrices) * quantity;
//       newTotalPrices[itemId] = totalPrice;
//     });
//     setTotalPrices(newTotalPrices);
//   };

//   const calculatePreparationTime = () => {
//     let maxPreparationTime = 0;
//     // listOfItems.orderedItems.forEach((item: { uniqueKey: any; size: any[]; }) => {
//       const itemId = item.uniqueKey;
//       const selectedSize = item.size.find(
//         (s: { sizeName: string; }) => s.sizeName === selectedSizes[itemId]
//       );
//       if (selectedSize) {
//         maxPreparationTime = Math.max(
//           maxPreparationTime,
//           selectedSize.preparationTime
//         );
//       }
//     });
//     setPreparationTime(maxPreparationTime);
//   };

//   const handleSizeChange = (uniqueKey: number, sizeName: string) => {
//     setSelectedSizes((prevSizes) => ({
//       ...prevSizes,
//       [uniqueKey]: sizeName,
//     }));
//   };

//   const handleAddonChange = (
//     uniqueKey: number,
//     addonName: string,
//     isChecked: boolean
//   ) => {
//     setSelectedAddons((prevAddons) => {
//       const currentAddons = prevAddons[uniqueKey] || [];
//       const newAddons = isChecked
//         ? [...currentAddons, addonName]
//         : currentAddons.filter((addon) => addon !== addonName);
//       return {
//         ...prevAddons,
//         [uniqueKey]: newAddons,
//       };
//     });
//   };

//   const handleQuantityChange = (
//     uniqueKey: number,
//     action: "increment" | "decrement"
//   ) => {
//     setQuantities((prevQuantities) => {
//       const currentQuantity = prevQuantities[uniqueKey] || 1;
//       const newQuantity =
//         action === "increment"
//           ? currentQuantity + 1
//           : Math.max(1, currentQuantity - 1);
//       return {
//         ...prevQuantities,
//         [uniqueKey]: newQuantity,
//       };
//     });
//   };

//   const handleDeleteItem = (uniqueKey: number) => {
//     dispatch(removeItemFromOrder({ uniqueKey }));

//     setSelectedSizes((prev) => {
//       const { [uniqueKey]: _, ...rest } = prev;
//       return rest;
//     });
//     setSelectedAddons((prev) => {
//       const { [uniqueKey]: _, ...rest } = prev;
//       return rest;
//     });
//     setQuantities((prev) => {
//       const { [uniqueKey]: _, ...rest } = prev;
//       return rest;
//     });
//     setTotalPrices((prev) => {
//       const { [uniqueKey]: _, ...rest } = prev;
//       return rest;
//     });
//   };

//   useEffect(() => {
//     calculateTotalPrice();
//     calculatePreparationTime();
//   }, [selectedSizes, selectedAddons, quantities, listOfItems.orderedItems]);

//   const handleSendOrder = () => {
//     const orderDetails: OrderDetails = {
//       tableNo: 5,
//       tableStatus: "Occupied",
//       menuItems: listOfItems.orderedItems.map((item: { name: any; uniqueKey: string | number; size: any[]; }) => ({
//         itemName: item.name,
//         quantity: quantities[item.uniqueKey] || 1,
//         selectedSize: selectedSizes[item.uniqueKey],
//         sellingPrice: totalPrices[item.uniqueKey] || 0,
//         ingredients:
//           item.size.find((s: { sizeName: string; }) => s.sizeName === selectedSizes[item.uniqueKey])
//             ?.ingredients || [],
//         addOns:
//           selectedAddons[item.uniqueKey]?.map((addonName) => {
//             const selectedSize = item.size.find(
//               (s: { sizeName: string; }) => s.sizeName === selectedSizes[item.uniqueKey]
//             );
//             const addon = selectedSize?.addOns.find(
//               (addon: { name: string; }) => addon.name === addonName
//             );
//             return {
//               name: addon?.name || "",
//               quantity: addon?.quantity || 0,
//               unit: addon?.unit || "",
//               addonPrice: addon?.addonPrice || 0,
//             };
//           }) || [],
//       })),
//       preparationTime,
//       totalPrice: Object.values(totalPrices).reduce(
//         (acc, curr) => acc + curr,
//         0
//       ),
//     };
//     console.log(orderDetails);
//     dispatch(placeOrder(orderDetails));
//   };

//   return (
//     <Box
//       borderWidth="1px"
//       borderRadius="md"
//       bg={"#FFFFF6"}
//       w={["fit", "fit", "40vw", "20vw"]}
//       h={["fit", "fit", "fit", "fit"]}
//     >
//       <Box
//         h={["60vh", "70vh", "75vh", "80vh"]}
//         display={"flex"}
//         flexDirection={"column"}
//         alignItems={"center"}
//         overflowY={"auto"}
//       >
//         <Text py={"4"} fontWeight={"bold"}>
//           Order Summary
//         </Text>
//         {listOfItems.orderedItems.map((item: { uniqueKey: number; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; size: any[]; }) => (
//           <Box
//             key={`${item.uniqueKey}`}
//             w={["85vw", "65vw", "45vw", "19vw"]}
//             p={["2", "3", "4"]}
//             borderWidth="1px"
//             borderRadius="md"
//             borderColor={"gray-200"}
//             rounded={"md"}
//           >
//             <Flex>
//               <Box>
//                 <Text fontWeight={"bold"}>{item.name}</Text>
//               </Box>
//               <Spacer />
//               <Text fontWeight={"bold"}>
//                 ${totalPrices[`${item.uniqueKey}`]?.toFixed(2) || "0.00"}
//               </Text>
//             </Flex>

//             <Flex>
//               <Box>
//                 <Select
//                   placeholder="Size"
//                   size={"sm"}
//                   mt={"2"}
//                   onChange={(e) =>
//                     handleSizeChange(item.uniqueKey, e.target.value)
//                   }
//                   value={selectedSizes[`${item.uniqueKey}`] || ""}
//                 >
//                   {item.size.map((s: { sizeName: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.Key | null | undefined; }) => (
//                     <option value={s.sizeName} key={s.sizeName}>
//                       {s.sizeName}
//                     </option>
//                   ))}
//                 </Select>

//                 {selectedSizes[`${item.uniqueKey}`] && (
//                   <Box mt={"2"}>
//                     <Text fontSize="sm" color="gray.900">
//                       Size: {selectedSizes[`${item.uniqueKey}`]}
//                     </Text>
//                   </Box>
//                 )}

//                 {selectedSizes[`${item.uniqueKey}`] && (
//                   <VStack align={"start"} mt={"2"}>
//                     <Text fontSize="sm" color="gray.900">
//                       Add-ons:
//                     </Text>
//                     {item.size
//                       .find(
//                         (s: { sizeName: string; }) => s.sizeName === selectedSizes[`${item.uniqueKey}`]
//                       )
//                       ?.addOns.map((addon: { name: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.Key | null | undefined; }) => (
//                         <Checkbox
//                           key={addon.name}
//                           isChecked={selectedAddons[
//                             `${item.uniqueKey}`
//                           ]?.includes(addon.name)}
//                           onChange={(e) =>
//                             handleAddonChange(
//                               item.uniqueKey,
//                               addon.name,
//                               e.target.checked
//                             )
//                           }
//                         >
//                           {addon.name}
//                         </Checkbox>
//                       ))}
//                   </VStack>
//                 )}
//               </Box>

//               <Spacer />
//               <Box mt={"2"}>
//                 <Flex alignItems={"center"}>
//                   <Button
//                     size={"sm"}
//                     bg={"none"}
//                     textColor={"#ff5841"}
//                     _hover={{ background: "red", textColor: "white" }}
//                     borderWidth={"1px"}
//                     borderRadius={"6px"}
//                     borderColor={"#ff5841"}
//                     onClick={() =>
//                       handleQuantityChange(item.uniqueKey, "decrement")
//                     }
//                   >
//                     -
//                   </Button>

//                   <Center w={"8"}>
//                     <Text>{quantities[`${item.uniqueKey}`] || 1}</Text>
//                   </Center>

//                   <Button
//                     size={"sm"}
//                     bg={"none"}
//                     textColor={"#ff5841"}
//                     _hover={{ background: "green", textColor: "white" }}
//                     borderWidth={"1px"}
//                     borderRadius={"6px"}
//                     borderColor={"#ff5841"}
//                     onClick={() =>
//                       handleQuantityChange(item.uniqueKey, "increment")
//                     }
//                   >
//                     +
//                   </Button>
//                 </Flex>
//               </Box>
//             </Flex>
//             <Flex justifyContent={"flex-end"}>
//               <Box
//                 as="button"
//                 borderRadius="md"
//                 bg="white"
//                 color="#ff5841"
//                 mt={"2"}
//                 onClick={() => handleDeleteItem(item.uniqueKey)}
//               >
//                 <Icon as={RiDeleteBin6Fill} />
//               </Box>
//             </Flex>
//           </Box>
//         ))}
//       </Box>
//       <Box p={["2", "4", "4", "4"]} borderTop={"1px"}>
//         <HStack spacing="1">
//           <Box>
//             <Box>
//               <Icon as={MdOutlineAccessTime} /> : {preparationTime || 0} mins
//             </Box>
//             <Box fontWeight={"bold"} w={"fit-content"}>
//               Total: $
//               {Object.values(totalPrices)
//                 .reduce((acc, curr) => acc + curr, 0)
//                 .toFixed(2)}
//             </Box>
//           </Box>
//           <Spacer />
//           <Box
//             as="button"
//             borderRadius="md"
//             bg="#ff5841"
//             color="white"
//             p={["1", "1", "2"]}
//             onClick={handleSendOrder}
//           >
//             Send Order
//           </Box>
//         </HStack>
//       </Box>
//     </Box>
//   );
// };

// export default OrderSummery;