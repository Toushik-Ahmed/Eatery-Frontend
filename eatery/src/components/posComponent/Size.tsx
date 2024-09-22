import {
  updateSelectedAddons,
  updateSelectedSize,
} from "@/redux/Pos/OrderSlice";
import { RootState } from "@/redux/store";
import { Box, Checkbox, Select, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  itemId: string;
  sizes: { sizeName: string; addOns: { name: string; addonPrice: number }[] }[];
};

const Size = ({ itemId, sizes }: Props) => {
  const dispatch = useDispatch();
  const selectedSizes = useSelector(
    (state: RootState) => state.orderInfo.selectedSizes
  );
  const selectedAddons = useSelector(
    (state: RootState) => state.orderInfo.selectedAddons
  );

  const handleSizeChange = (sizeName: string) => {
    dispatch(updateSelectedSize({ itemId, sizeName }));
  };

  const handleAddonChange = (addonName: string, isChecked: boolean) => {
    dispatch(updateSelectedAddons({ itemId, addonName, isChecked }));
  };
  return (
    <Box>
      <Select
        placeholder="Select Size"
        size="sm"
        mt="2"
        onChange={(e) => handleSizeChange(e.target.value)}
        value={selectedSizes[itemId] || ""}
      >
        {sizes.map((s) => (
          <option value={s.sizeName} key={s.sizeName}>
            {s.sizeName}
          </option>
        ))}
      </Select>
      {selectedSizes[itemId] && (
        <VStack align="start" mt="2">
          <Text fontSize="sm" color="gray.900">
            Add-ons:
          </Text>
          {sizes
            .find((s) => s.sizeName === selectedSizes[itemId])
            ?.addOns.map((addon) => (
              <Checkbox
                key={addon.name}
                isChecked={selectedAddons[itemId]?.includes(addon.name)}
                onChange={(e) =>
                  handleAddonChange(addon.name, e.target.checked)
                }
              >
                {addon.name}
              </Checkbox>
            ))}
        </VStack>
      )}
    </Box>
  );
};

export default Size;
