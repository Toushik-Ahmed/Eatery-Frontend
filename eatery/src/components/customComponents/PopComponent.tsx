import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { CiEdit } from 'react-icons/ci';

type Props = {};

const PopComponent = (props: Props) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button backgroundColor={'greenyellow'}>
            <CiEdit />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopComponent;
