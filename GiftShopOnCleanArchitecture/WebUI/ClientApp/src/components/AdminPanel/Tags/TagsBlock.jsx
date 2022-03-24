import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagCard from './TagCard';
import { CreateTag } from './TagAction';

class TagsBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { tags, createTag } = this.props;
        const tagsList = tags.list.sort((a, b) => {
            if (a.tagName === "NewTag") {
                return -1;
            }

            if (a.tagName !== "NewTag") {
                return 1;
            }

            return 0;
        })
        return (
            <div className='boxes-block'>
                <div className='boxes-actions'>
                    <button onClick={() => createTag("NewTag")}>
                        ADD NEW TAG
                    </button>
                    
                </div>
                <div className='tags-list'>
                    {
                      tagsList.map(tag =>
                        <TagCard key={tag.id} tagInfo={tag} />
                      )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createTag: (tagName) => dispatch(CreateTag(tagName))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagsBlock);