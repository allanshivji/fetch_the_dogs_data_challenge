import { FormattedMessage, injectIntl } from 'react-intl';

const InjectMessages = (props: any) => {
  return <FormattedMessage {...props} />;
};

export default injectIntl(InjectMessages);
