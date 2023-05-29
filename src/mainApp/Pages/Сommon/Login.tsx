import styled from "styled-components";
import { FormLogin } from "../../Form/FormLogin";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


const Login = () => {
  return (
    <Page>
      <FormLogin />
    </Page>
  );
};

export default Login;