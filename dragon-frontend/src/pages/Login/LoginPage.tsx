import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../helpers/localStorage';
import { logIn as logInAction } from '../../actions/auth';
import { RootState } from '../../reducers';
import Logo from '../../components/Logo';
import Input from './Input';
import '../../styles/login.css';
import SignInButton from './SignInButton';
import { ErrorType } from '../../models/enums';

const mapStateToProps = (state: RootState) => state.auth;
const dispatchProps = { logIn: logInAction.request };

type Props = WithTranslation & ReturnType<typeof mapStateToProps> & typeof dispatchProps;
interface State {
  name: string;
  password: string;
  invalid: boolean;
}

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { name: '', password: '', invalid: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { name, password } = this.state;
    if (
      name === undefined ||
      name.length === 0 ||
      password === undefined ||
      password.length === 0
    ) {
      this.setState({ invalid: true });
      return;
    }

    this.setState({ invalid: false });
    const { logIn } = this.props;
    logIn({ username: name, password });
  }

  render() {
    if (isAuthenticated()) return <Redirect to="/" />;
    const { isFetching, error } = this.props;
    const { name, password, invalid } = this.state;

    return (
      <div className="gradient min-h-screen flex items-center justify-center select-none flex-col">
        <div className="mb-24">
          <div className="flex items-center text-white py-2">
            <Logo className="h-16 w-16 mr-4" />
            <span className="font-bold text-6xl tracking-tight">dragon</span>
          </div>
          <div className="mx-auto w-64 md:w-56 text-center">
            <Input
              placeholder="Name"
              disabled={isFetching}
              value={name}
              onChange={(value) => this.setState({ name: value })}
              onEnter={this.onSubmit}
            />
            <Input
              placeholder="Password"
              type="password"
              disabled={isFetching}
              value={password}
              onChange={(value) => this.setState({ password: value })}
              onEnter={this.onSubmit}
            />
            {(error || invalid) && (
              <div className="text-white text-sm m-2 font-light">
                {invalid && 'Please, type in your name and password'}
                {!invalid && error === ErrorType.Unauthorized && 'Invalid password'}
                {!invalid && error !== ErrorType.Unauthorized && 'Something failed'}
              </div>
            )}

            <SignInButton loading={isFetching} onClick={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, dispatchProps)(LoginPage));
