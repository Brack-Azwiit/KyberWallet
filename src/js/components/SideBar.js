import React from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as _ from "underscore"

import NodeSwitch from "./NodeSwitch"

@connect((store) => {
  var pendingTxs = _.where(store.txs, { status: "pending" })
  return {
    path: store.router.location.pathname,
    pendingTxs: pendingTxs,
  }
})
export default class SideBar extends React.Component {

  tabClasses = (url) => {
    return url == this.props.path ? "tabs-title is-active" : "tabs-title"
  }

  render() {
    return (
      <div class="k-header">
        <div class="k-header-logo">
          <img src="assets/logo_icon.png" />
        </div>
        <div class="k-header-menu" id="menu">
          <ul class="tabs vertical" data-tabs>
            <li class={this.tabClasses("/")}>
              <Link to="/" >
                <i class="k-icon k-icon-account"></i> Accounts
              </Link>
            </li>
            <li class={this.tabClasses("/exchange")}>
              <Link to="/exchange">
                <i class="k-icon k-icon-exchange"></i> Exchange
              </Link>
            </li>
            <li class={this.tabClasses("/wallets")}>
              <Link to="/wallets">
                <i class="k-icon k-icon-wallet"></i> Wallets
              </Link>
            </li>
            <li class={this.tabClasses("/contracts")}>
              <Link to="/contracts">
                <i class="k-icon k-icon-payment"></i> Contracts
              </Link>
            </li>
            <li class={this.tabClasses("/transactions")}>
              <Link to="/transactions">
                <i class="k-icon k-icon-transaction"></i> Transactions
              </Link>
            </li>
          </ul>
          <NodeSwitch />
        </div>
        <div class="k-header-pendding-tx">
          <div>
            <div class="number">0{this.props.pendingTxs.length}</div>
            <div class="pending">pending</div>
          </div>
          <div>Transactions</div>
        </div>
        <div class="k-header-footer">
            KyberWallet - Official ethereum wallet from KybetNetwork
        </div>
      </div>
    )
  }
}
