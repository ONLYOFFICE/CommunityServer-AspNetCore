import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Field, reduxForm, SubmissionError } from "redux-form";
import {
  Button,
  TextInput,
  Text,
  InputBlock,
  Icons,
  SelectedItem
} from "asc-web-components";
import submit from "./submit";
import validate from "./validate";

const generateItems = numItems =>
  Array(numItems)
    .fill(true)
    .map(_ => Math.random()
        .toString(36)
        .substr(2)
    );

const GroupForm = props => {
  const { error, handleSubmit, submitting, initialValues, history } = props;

  const selectedList = generateItems(100);
  
  console.log(selectedList);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="group-name">
          <Text.Body as="span" isBold={true}>Department name:</Text.Body>
        </label>
        <div style={{width: "320px"}}>
          <TextInput id="group-name" name="group-name" scale={true} />
        </div>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label htmlFor="head-selector">
          <Text.Body as="span" isBold={true}>Head of department:</Text.Body>
        </label>
        <InputBlock
          id="head-selector"
          value="Add employee"
          iconName="ExpanderDownIcon"
          iconSize={8}
          isIconFill={true}
          iconColor="#A3A9AE"
          scale={false}
          isReadOnly={true}
        >
          <Icons.CatalogEmployeeIcon size="medium" />
        </InputBlock>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label htmlFor="employee-selector">
          <Text.Body as="span" isBold={true}>Members:</Text.Body>
        </label>
        <InputBlock
          id="employee-selector"
          value="Add employee"
          iconName="ExpanderDownIcon"
          iconSize={8}
          isIconFill={true}
          iconColor="#A3A9AE"
          scale={false}
          isReadOnly={true}
        >
          <Icons.CatalogEmployeeIcon size="medium" />
        </InputBlock>
      </div>
      <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
        {selectedList.map(item => 
          <SelectedItem
            text={`Fake User-${item}`}
            onClick={(e) => console.log("onClose", e.target)}
            isInline={true}
            style={{ marginRight: "8px", marginBottom: "8px" }}
          />
        )}
      </div>
      <div>{error && <strong>{error}</strong>}</div>
      <div style={{ marginTop: "60px" }}>
        <Button label="Save" primary type="submit" isDisabled={submitting} size="big" />
        <Button
          label="Cancel"
          style={{ marginLeft: "8px" }}
          size="big"
          isDisabled={submitting}
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  validate,
  form: "groupForm",
  enableReinitialize: true
})(withRouter(GroupForm));
