import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Loader from "@appserver/components/loader";
import PageLayout from "@appserver/common/PageLayout";
import commonUtils from "@appserver/common/utils";
import { inject, observer } from "mobx-react";
const { tryRedirectTo } = commonUtils;

class ActivateEmail extends React.PureComponent {
  componentDidMount() {
    const { logout, changeEmail, linkData } = this.props;
    const [email, uid, key] = [
      linkData.email,
      linkData.uid,
      linkData.confirmHeader,
    ];
    logout();
    changeEmail(uid, email, key)
      .then((res) => {
        tryRedirectTo(`/login/confirmed-email=${email}`);
      })
      .catch((e) => {
        // console.log('activate email error', e);
        tryRedirectTo(`/login/error=${e}`);
      });
  }

  render() {
    // console.log('Activate email render');
    return <Loader className="pageLoader" type="rombs" size="40px" />;
  }
}

ActivateEmail.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
const ActivateEmailForm = (props) => (
  <PageLayout>
    <PageLayout.SectionBody>
      <ActivateEmail {...props} />
    </PageLayout.SectionBody>
  </PageLayout>
);

export default inject(({ auth }) => {
  const { logout, userStore } = auth;
  return {
    logout,
    changeEmail: userStore.changeEmail,
  };
})(withRouter(observer(ActivateEmailForm)));
