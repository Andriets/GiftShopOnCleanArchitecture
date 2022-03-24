import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { DeleteTagById, EditTag } from './TagAction';

class TagCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }

        this.DeleteTag = this.DeleteTag.bind(this);
    }

    OnSubmit = (formData) => {
        this.setState({
            editMode: false
        });

        const tag = {
            TagId: this.props.tagInfo.id,
            NewTagName: formData.tagName
        };
        this.props.editTag(tag);
    }

    SetEditMode = (mode) => {
        this.setState({
            editMode: mode
        });

        if (!mode) {
            this.props.reset();
        }
    }

    DeleteTag = () => {
        const { tagInfo, tags, deleteTagById } = this.props;
        const newTagList = tags.filter(tag => tag.id !== tagInfo.id);
        deleteTagById(tagInfo.id, newTagList);
    }

    render() {
        const { tagName } = this.props.tagInfo;
        const { setEditMode, handleSubmit } = this.props;
        return (
            <div className='tag-card'>
                {!this.state.editMode 
                    ? <>
                        <div className='tag-name'>
                            <span>{tagName}</span>
                        </div>
                        <div className='tag-actions'>
                            <img onClick={() => this.SetEditMode(true)} src={process.env.PUBLIC_URL + '/img/Edit.svg'}/>
                            <img onClick={() => this.DeleteTag()} src={process.env.PUBLIC_URL + '/img/Trash.svg'}/>
                        </div>
                      </>
                    : <form onSubmit={handleSubmit(this.OnSubmit)} autoComplete="off">
                        <div className='tag-name'>
                            <Field type="text" placeholder={tagName} name="tagName" component="input" />
                        </div>
                        <div className='tag-actions'>
                            <button type="submit">
                                <img src={process.env.PUBLIC_URL + '/img/Done.svg'}/> 
                            </button>
                            <button onClick={() => this.SetEditMode(false)}>
                                <img  src={process.env.PUBLIC_URL + '/img/Cancel.svg'}/>
                            </button>
                        </div>
                      </form>
                }
            </div>
        );
    }
}

TagCard = reduxForm({
    form: "tag-form",
    enableReinitialize: true
})(TagCard);

const mapStateToProps = (state, props) => {
    return {
        tags: state.tags.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTagById: (tagId, tags) => dispatch(DeleteTagById(tagId, tags)),
        editTag: (tag) => dispatch(EditTag(tag))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagCard);