import Login from "./Login";
import { Card, Divider, Layout } from "antd";
import { useIntl } from 'react-intl'

const LoginPage = () =>{ 
  const intl = useIntl()
  return(
  <>
    <Layout style={{ minHeight: "100vh" }}>
      <Divider orientation="center">
        <Card title={intl.formatMessage({id: 'title.Login'})} style={{ width: 600 }}>
          <Login></Login>
        </Card>
      </Divider>
    </Layout>
  </>
);}
export default LoginPage;
