/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'umi';
import styles from './UserLayout.less';
import qxIcon from '../assets/user/icon.png';



class UserLayout extends Component {
  static iconURL() {
    return qxIcon;
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <div className="title-wrap">
          {/* <img className={`icon ${hostName === 'shixun.abc.com' ? 'sx-icon' : ''}`} src={UserLayout.iconURL()} alt="icon" /> */}
        </div>
        <div className="box-container">{children}</div>
        <div className="publicSecurityBureau">
          <a
            target="_blank"
            href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010802010236"
          >
            {/* <img src="//s.xxxxx.com/file/329cbd7d-eb97-4dfa-9c93-ad346dd0e71d.png" alt="" /> */}
            <p>浙公网安备 </p>
          </a>
        </div>
      </div>
      // </DocumentTitle>
    );
  }
}

export default connect()(UserLayout);
