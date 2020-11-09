import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAnswers } from '../../../redux/answers/answers.actions';
import handleSorting from '../../../services/handleSorting';

import AnswerItem from './AnswerItem/AnswerItem.component';
import Spinner from '../../../components/spinner/spinner.component';
import AnswerForm from './AnswerForm/AnswerForm.component';
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup.component';

import './AnswerSection.styles.scss';

const AnswerSection = ({ getAnswers, auth, answer, postId }) => {
    useEffect(() => {
        getAnswers(postId);
        // eslint-disable-next-line
    }, [ getAnswers ]);

    const [sortType, setSortType] = useState('Newest');

    return <Fragment>
        <div className='answer'>
            <div className='answer-header fc-black-800'>
                <div className='answer-sub-header'>
                    <div className='answer-headline'>
                        <h2>Answers</h2>
                    </div>
                    <ButtonGroup
                        buttons={['Newest', 'Oldest']}
                        selected={sortType}
                        setSelected={setSortType}
                    />
                </div>
            </div>
            {answer.loading === null ? <Spinner width='25px' height='25px'/> : answer.answers
                ?.sort(handleSorting(sortType))
                .map(answer => (
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