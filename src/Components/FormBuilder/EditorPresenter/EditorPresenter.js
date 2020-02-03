import Style from "./EditorPresenter.module.css";
import PropTypes from "prop-types";
import { Editor } from "./Editor";
import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Class extends Component {
  constructor(props) {
    super(props);
    this.editorElement = React.createRef();
  }

  deleteCompact = id => {
    this.props.deleteQuestion(id);
  };

  onConfigBtnClick = (event, index) => {
    event.preventDefault();
    const { id } = this[`compactConfig${index}`].props.element;
    this.props.setCurrentEditor(id);
    setTimeout(
      function() {
        this.props.toggleConfigModal();
      }.bind(this),
      10
    );
  };
  handleDragEnd = result => {
    this.props.updateElementOrder(result);
  };

  draggableChildren = (ele, index, dragHandleProps) => {
    //  don't show an editor for introduction
    if (ele.type === "introduction") return null;
    return ele.type == "branch" || ele.type == "address" ? (
      <div className={Style.compactAllCont}>
        <Editor
          ref={elem => {
            this[`compactConfig${index}`] = elem;
          }}
          setQuestionProperty={this.props.setQuestionProperty}
          setCurrentEditor={this.props.setCurrentEditor}
          setElementChildren={this.props.setElementChildren}
          deleteQuestion={this.props.deleteQuestion}
          element={ele}
          parent={null}
          key={ele.id}
          index={index}
          click={this.props.toggleConfigModal}
          dragHandleProps={dragHandleProps}
        />

        <div className={Style.controlCont}>
          <a
            className={Style.configElem}
            onClick={e => {
              this.onConfigBtnClick(e, index);
            }}
          >
            <i className="ion ion-ios-settings"></i>
          </a>

          <a
            className={Style.removeElem}
            onClick={() => {
              this.deleteCompact(ele.id);
            }}
          >
            <i className="ion ion-ios-close-outline"></i>
          </a>

          <div className={Style.clearfix}></div>
        </div>
        <div className={Style.compactCont}>
          {ele.children.map(child => {
            return (
              <Editor
                setQuestionProperty={this.props.setQuestionProperty}
                setCurrentEditor={this.props.setCurrentEditor}
                setElementChildren={this.props.setElementChildren}
                deleteQuestion={this.props.deleteQuestion}
                element={child}
                parent={child.parent}
                key={child.id}
                index={index}
                click={this.props.toggleConfigModal}
                dragHandleProps={dragHandleProps}
              />
            );
          })}
        </div>
      </div>
    ) : (
      <Editor
        setQuestionProperty={this.props.setQuestionProperty}
        setCurrentEditor={this.props.setCurrentEditor}
        setElementChildren={this.props.setElementChildren}
        deleteQuestion={this.props.deleteQuestion}
        element={ele}
        parent={null}
        key={ele.id}
        index={index}
        click={this.props.toggleConfigModal}
        dragHandleProps={dragHandleProps}
      />
    );
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId={"droppable"}>
          {provided => (
            <section
              className={Style.editorPresenter}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div
                className={`${Style.editorsContainer} overflow_scroll auto_scroll`}
              >
                {this.props.formElements.map((ele, index) => {
                  if (ele.type === "introduction") return;
                  return (
                    <Draggable
                      draggableId={ele.id}
                      index={ele.position}
                      key={ele.id}
                    >
                      {providedd => (
                        <div
                          className={Style.draggable}
                          ref={providedd.innerRef}
                          {...providedd.draggableProps}
                        >
                          {this.draggableChildren(
                            ele,
                            index,
                            providedd.dragHandleProps
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export const EditorPresenter = Class;

EditorPresenter.propTypes = {
  setQuestionProperty: PropTypes.func.isRequired,
  setElementChildren: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired
};
