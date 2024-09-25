import { Box, Button, Spacer, Text } from '@chakra-ui/react';
import { FaHome, FaLongArrowAltLeft } from 'react-icons/fa';

type Props = {};

const BackToAdmin = (props: Props) => {
  return (
    <div>
      <Button
        p={2}
        size={'md'}
        color={'black'}
        w="auto"
        h="auto"
        minW="auto"
        minH="auto"
        bg="#f53e62"
        _hover={{ color: 'white', bg: '#f53e62' }}
      >
        <Box display={'flex'} gap={0.1} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
        <FaHome />
          {/* <Spacer />
          <Text fontWeight={'bold'} fontSize={'md'}>Back</Text> */}
        </Box>
      </Button>
    </div>
  );
};
export default BackToAdmin;
