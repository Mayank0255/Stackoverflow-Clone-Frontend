import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAnswers } from '../../../redux/answers/answers.actions';

import AnswerItem from './AnswerItem/AnswerItem.component';
import Spinner from '../../../components/spinner/spinner.component';
import AnswerForm from './AnswerForm/AnswerForm.component';

import './AnswerSection.styles.scss';

const AnswerSection = ({ getAnswers, auth, answer, postId}) => {
    useEffect(() => {
        getAnswers(postId);
        // eslint-disable-next-line
    }, [ getAnswers ]);

    return <Fragment>
        <div className='answer'>
            <div className='answer-header fc-black-800'>
                <div className='answer-sub-header'>
                    <div className='answer-headline'>
                        <h2>Answers</h2>
                    </div>
                    <div className="grid--cell">
                        <div className=" grid s-btn-group js-filter-btn">
                            <Link className="s-btn s-btn__filled is-selected"
                                  to="#"
                                  data-nav-xhref="" title="Answers with the latest activity first"
                                  data-value="active" data-shortcut="A">
                                Active
                            </Link>
                            <Link className="s-btn s-btn__filled"
                                  to="#"
                                  data-nav-xhref="" title="Answers in the order they were provided"
                                  data-value="oldest" data-shortcut="O">
                                Oldest
                            </Link>
                            <Link className="s-btn s-btn__filled"
                                  to="#"
                                  data-nav-xhref="" title="Answers with the highest score first"
                                  data-value="votes" data-shortcut="V">
                                Votes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {answer.loading === null ? <Spinner width='25px' height='25px'/> : answer.answers.map(answer => (
                <div key={answer.id} className='answers'>
                    <AnswerItem
                        answer={answer}
                        auth={auth}
                        postId = {postId}
                    />
                </div>
            ))}
            <div className='add-answer'>
                <AnswerForm
                    auth={auth}
                    postId={postId}
                />
            </div>
        </div>
    </Fragment>
}

AnswerSection.propTypes = {
    auth: PropTypes.object.isRequired,
    getAnswers: PropTypes.func.isRequired,
    answer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    answer: state.answer
});

export default connect(mapStateToProps, { getAnswers })(AnswerSection);