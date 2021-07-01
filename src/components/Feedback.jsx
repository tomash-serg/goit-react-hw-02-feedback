import { Component } from 'react';
import { VscFeedback } from 'react-icons/vsc';
import { Header, Container } from 'components/styles/feedback';
import Statistic from 'components/Statistic/Statistic';
import Buttons from 'components/Buttons/Buttons';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onButtonHandler = e => {
    const labelBtn = e.currentTarget.textContent.toLowerCase();
    this.setState(prevState => ({ [labelBtn]: prevState[labelBtn] + 1 }));
  };

  countTotalFeedback = () => {
    const feedbacksArray = Object.values(this.state);
    const feedbacks = feedbacksArray.reduce((acc, num) => (acc += num), 0);
    return feedbacks ? feedbacks : null;
  };

  countPositiveFeedbackPercentage = (good, bad) => {
    const persentage = Math.floor((good / (good + bad)) * 100);
    return persentage ? persentage + '%' : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const feedbacksTotal = this.countTotalFeedback();
    const positiveFeedbacks = this.countPositiveFeedbackPercentage(good, bad);

    return (
      <Container>
        <div>
          <Header>
            Please leave feedback <VscFeedback />
          </Header>
          <Buttons handler={this.onButtonHandler} />
          {feedbacksTotal && (
            <Statistic
              states={{
                good,
                neutral,
                bad,
                'Total feedbacks': feedbacksTotal,
                'Positive feedbacks': positiveFeedbacks,
              }}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default Feedback;
