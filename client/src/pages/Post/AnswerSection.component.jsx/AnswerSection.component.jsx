import React, {useEffect, Fragment,useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAnswers, addAnswer } from '../../../redux/answers/answers.actions';

import AnswerItem from './AnswerItem/AnswerItem.component';
import Spinner from '../../../components/spinner/spinner.component';
import Button from '../../../components/Button/Button.component';

import './AnswerSection.styles.scss';

const AnswerSection = ({ addAnswer, getAnswers, auth, answer, postId, paramId}) => {
    useEffect(() => {
        getAnswers(paramId);
        // eslint-disable-next-line
    }, [ getAnswers ]);

    const [ formData, setFormData ] = useState({
        text: ''
    });

    const { text } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        addAnswer(paramId,{text});
        setFormData({
            text: ''
        });
    };

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
                {!auth.loading && auth.isAuthenticated ? <Fragment>
                    <form
                        className='answer-form'
                        onSubmit={e => handleSubmit(e)}
                    >
                        <div className='answer-grid'>
                            <label className=' fc-black-800'>Your Answer</label>
                            <textarea
                                className='s-textarea'
                                name='text'
                                cols='30'
                                rows='12'
                                value={text}
                                onChange={e => handleChange(e)}
                                placeholder='Enter body with minimum 30 characters'
                                id='text'
                            >
                            </textarea>
                            <button className='s-btn s-btn__primary'>Post Your Answer</button>
                        </div>
                    </form>
                </Fragment> : <Fragment>
                    <Button
                        text={'You need to login to add an answer'}
                        link={'/login'}
                        type={'s-btn__outlined'}
                        marginTop={'12px'}
                    />
                </Fragment>}
            </div>
        </div>
    </Fragment>
}

AnswerSection.propTypes = {
    auth: PropTypes.object.isRequired,
    addAnswer: PropTypes.func.isRequired,
    getAnswers: PropTypes.func.isRequired,
    answer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    answer: state.answer
});

export default connect(mapStateToProps, { getAnswers,addAnswer })(AnswerSection);