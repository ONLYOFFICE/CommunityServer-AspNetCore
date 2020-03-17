import React from "react";
import { Icons, DropDown, utils } from "asc-web-components";
import PropTypes from 'prop-types';
import { Caret, StyledHideFilterButton } from '../StyledFilterInput';

const { handleAnyClick } = utils.event;

class HideFilter extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.dropDownRef = React.createRef();
    this.state = {
      popoverOpen: this.props.open
    };
  }

  componentWillUnmount() {
    handleAnyClick(false, this.handleClick);
  }

  componentDidUpdate(prevState) {
    const { popoverOpen } = this.state;
    if (popoverOpen !== prevState.popoverOpen) {
      handleAnyClick(popoverOpen, this.handleClick);
    }
  }

  onClick = (state, e) => {
    if (!state && e && this.dropDownRef.current.contains(e.target)) {
      return;
    }
    if (!this.props.isDisabled) {
      this.setState({
        popoverOpen: state
      });
    }
  };

  handleClick = e => {
    this.state.popoverOpen &&
      !this.dropDownRef.current.firstElementChild.contains(e.target) &&
      this.onClick(false);
  };

  render() {
    //console.log("HideFilter render");
    const { isDisabled, count, children } = this.props;
    const { popoverOpen } = this.state;
    return (
      <div
        className='styled-hide-filter'
        onClick={this.onClick.bind(this, !popoverOpen)}
        ref={this.ref}
      >
        <StyledHideFilterButton
          id="PopoverLegacy"
          isDisabled={isDisabled}
        >
          {count}
          <Caret isOpen={popoverOpen}>
            <Icons.ExpanderDownIcon
              color="#A3A9AE"
              isfill={true}
              size="scale"
            />
          </Caret>
        </StyledHideFilterButton>

        <div className='dropdown-style' ref={this.dropDownRef}>
          <DropDown
            className="drop-down"
            clickOutsideAction={this.handleClick}
            manualY="8px"
            open={popoverOpen}
          >
            {children}
          </DropDown>
        </div>
      </div>
    );
  }
}
HideFilter.propTypes = {
  children: PropTypes.any,
  count: PropTypes.number,
  isDisabled: PropTypes.bool,
  open: PropTypes.bool,
}
export default HideFilter;