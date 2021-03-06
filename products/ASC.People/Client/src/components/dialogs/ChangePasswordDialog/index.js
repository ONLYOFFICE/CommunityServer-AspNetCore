import React from "react";
import PropTypes from "prop-types";
import { ModalDialog, Button, Link, Text } from "asc-web-components";
import { withTranslation, Trans } from "react-i18next";
import { api, toastr } from "asc-web-common";

const { sendInstructionsToChangePassword } = api.people;

class ChangePasswordDialogComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      isRequestRunning: false,
    };
  }
  onSendPasswordChangeInstructions = () => {
    const { email, onClose } = this.props;
    this.setState({ isRequestRunning: true }, () => {
      sendInstructionsToChangePassword(email)
        .then((res) => {
          toastr.success(res);
        })
        .catch((error) => toastr.error(error))
        .finally(() => {
          this.setState({ isRequestRunning: false }, () => onClose());
        });
    });
  };

  render() {
    console.log("ChangePasswordDialog render");
    const { t, visible, email, onClose } = this.props;
    const { isRequestRunning } = this.state;

    return (
      <ModalDialog visible={visible} onClose={onClose}>
        <ModalDialog.Header>{t("PasswordChangeTitle")}</ModalDialog.Header>
        <ModalDialog.Body>
          <Text fontSize="13px">
            <Trans
              i18nKey="MessageSendPasswordChangeInstructionsOnEmail"
              ns="ChangePasswordDialog"
            >
              Send the password change instructions to the
              <Link
                type="page"
                href={`mailto:${email}`}
                noHover
                color="#316DAA"
                title={email}
              >
                {{ email }}
              </Link>
              email address
            </Trans>
          </Text>
        </ModalDialog.Body>
        <ModalDialog.Footer>
          <Button
            key="SendBtn"
            label={t("SendButton")}
            size="medium"
            primary={true}
            onClick={this.onSendPasswordChangeInstructions}
            isLoading={isRequestRunning}
          />
        </ModalDialog.Footer>
      </ModalDialog>
    );
  }
}

const ChangePasswordDialog = withTranslation("ChangePasswordDialog")(
  ChangePasswordDialogComponent
);

ChangePasswordDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default ChangePasswordDialog;
