import { LoggedInuser, loggedInuser } from "@/services/apiservice";
import { Box, Button, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome, FaLongArrowAltLeft } from "react-icons/fa";

type Props = {};

const BackToAdmin = (props: Props) => {
  const [user, setUserInfo] = useState<LoggedInuser | undefined>();
  const [label, setLabel] = useState("User Name");
  const [userType, setUserType] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await loggedInuser();
        setUserInfo(userData);
        setLabel(userData.user.firstName);
        setUserType(userData.user.userType);
        console.log(userData.user);
        console.log(userData.user.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
    console.log(userType);
  }, []);

  const handleBackToAdmin = () => {
    router.push("/dashboard");
  };
  return (
    <div>
      <Button
        p={2}
        size={"md"}
        color={"black"}
        w="auto"
        h="auto"
        minW="auto"
        minH="auto"
        bg="#f53e62"
        _hover={{ color: "white", bg: "#f53e62" }}
        onClick={handleBackToAdmin}
      >
        <Box
          display={"flex"}
          gap={0.1}
          justifyContent={"center"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <FaHome />
          {/* <Spacer />
          <Text fontWeight={'bold'} fontSize={'md'}>Back</Text> */}
        </Box>
      </Button>
    </div>
  );
};
export default BackToAdmin;
