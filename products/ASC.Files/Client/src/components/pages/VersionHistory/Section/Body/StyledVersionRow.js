import styled from "styled-components";
import { Row, utils } from "asc-web-components";

const { tablet } = utils.device;

const StyledVersionRow = styled(Row)`
  min-height: 70px;

  @media ${tablet} {
    min-height: 69px;
  }
  .version_badge {
    cursor: pointer;
    margin-right: 16px;

    .version_badge-text {
      position: absolute;
      left: 6px;
    }

    margin-left: 0px;
    margin-top: ${(props) => (props.showEditPanel ? "13px" : "-2px")};

    @media ${tablet} {
      margin-top: 0px;
    }
  }

  .version-link-file {
    margin-top: ${(props) => (props.showEditPanel ? "12px" : "-3px")};
    @media ${tablet} {
      margin-top: -1px;
    }
  }

  .icon-link {
    width: 10px;
    height: 10px;
    margin-left: 9px;
    margin-top: ${(props) => (props.showEditPanel ? "11px" : "-3px")};
    @media ${tablet} {
      margin-top: -1px;
    }
  }

  .version_modal-dialog {
    display: none;

    @media ${tablet} {
      display: block;
    }
  }

  .version_edit-comment {
    display: block;

    @media ${tablet} {
      display: none;
      margin-left: 63px;
    }
  }

  .textarea-desktop {
    margin: 9px 23px 1px -7px;
  }

  .version_content-length {
    display: block;
    margin-left: auto;
    margin-top: ${(props) => (props.showEditPanel ? "12px" : "-3px")};

    @media ${tablet} {
      display: none;
    }
  }

  .version_link {
    display: ${(props) => (props.showEditPanel ? "none" : "block")};
    text-decoration: underline dashed;
    white-space: break-spaces;
    margin-left: -7px;
    margin-top: 4px;

    @media ${tablet} {
      display: none;
      text-decoration: none;
    }
  }

  .version_text {
    display: none;

    @media ${tablet} {
      display: block;
      margin-left: 1px;
      margin-top: 5px;
    }
  }

  .version_link-action {
    display: block;
    margin-left: auto;
    margin-top: 5px;

    :last-child {
      margin-left: 8px;
    }

    @media ${tablet} {
      display: none;
    }
  }

  .row_context-menu-wrapper {
    display: none;

    @media ${tablet} {
      display: block;
    }
  }

  .row_content {
    display: block;
  }

  .modal-dialog-aside-footer {
    width: 90%;

    .version_save-button {
      width: 100%;
    }
  }

  .row_context-menu-wrapper {
    margin-right: -3px;
    margin-top: -25px;
  }

  .version_edit-comment-button-primary {
    margin-right: 8px;
    width: 87px;
  }
  .version_edit-comment-button-second {
    width: 87px;
  }
  .version_modal-dialog .modal-dialog-aside-header {
    border-bottom: unset;
  }
  .version_modal-dialog .modal-dialog-aside-body {
    margin-top: -24px;
  }
`;

export default StyledVersionRow;
