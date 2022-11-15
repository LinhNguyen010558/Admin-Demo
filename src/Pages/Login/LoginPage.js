import Login from "./Login";
import { Card, Divider, Layout } from "antd";

const LoginPage = () => (
  <>
    <Layout style={{ minHeight: "100vh" }}>
      <Divider orientation="center">
        <Card title="Login" style={{ width: 600 }}>
          <Login></Login>
        </Card>
      </Divider>
    </Layout>
  </>
);
export default LoginPage;
