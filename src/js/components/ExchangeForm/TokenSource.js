import React from "react"
import { connect } from "react-redux"

import {selectSourceToken, specifySourceAmount, suggestRate} from "../../actions/exchangeFormActions"
import {toT, toTWei} from "../../utils/converter"
import constants from "../../services/constants"


@connect((store) => {
  var selectedAccount = store.exchangeForm.selectedAccount;
  var account = store.accounts.accounts[selectedAccount];
  if (account) {
    var selectedToken = store.exchangeForm.sourceToken
    var selectedTokenBalance
    if (selectedToken == constants.ETHER_ADDRESS) {
      selectedTokenBalance = account.balance.toString(10)
    } else {
      selectedTokenBalance = account.tokens[selectedToken].balance.toString(10)
    }
    return {
      tokens: Object.keys(account.tokens).map((addr) => {
        return {
          name: account.tokens[addr].name,
          icon: account.tokens[addr].icon,
          symbol: account.tokens[addr].symbol,
          address: account.tokens[addr].address,
          balance: account.tokens[addr].balance.toString(10),
        }
      }),
      balance: account.balance.toString(10),
      selectedToken: selectedToken,
      selectedTokenBalance: selectedTokenBalance,
      specifiedAmount: store.exchangeForm.sourceAmount,
      destToken: store.exchangeForm.destToken,
      error: store.exchangeForm.errors["sourceAmountError"],
      sourceTokenError: store.exchangeForm.errors["sourceTokenError"],
    }
  } else {
    return {
      tokens: [],
      balance: 0,
      selectedToken: store.exchangeForm.sourceToken,
      specifiedAmount: store.exchangeForm.sourceAmount,
      destToken: store.exchangeForm.destToken,
      selectedTokenBalance: 0,
      error: "",
      sourceTokenError: "",
    }
  }
})
export default class TokenSource extends React.Component {

  selectToken(event) {
    this.props.dispatch(
      selectSourceToken(event.target.value))
    if (event.target.value != "" && this.props.destToken) {
      this.props.dispatch(suggestRate(
        event.target.value,
        this.props.destToken
      ))
    }
  }

  specifyAmount(event) {
    var valueString = event.target.value == "" ? "0" : event.target.value
    this.props.dispatch(specifySourceAmount(
      toTWei(valueString)))
  }

  render() {
    var tokenOptions = this.props.tokens.map((token) => {
      return <option key={token.address} value={token.address}>{token.symbol}</option>
    })
    var error = ""
    if (this.props.error && this.props.error != "") {
      error = (<div class="error">
        <i class="k-icon k-icon-error"></i>
        Specified amount is {this.props.error}
      </div>)
    }
    var sourceTokenError = ""
    if (this.props.sourceTokenError && this.props.sourceTokenError != "") {
      sourceTokenError = (<div class="error">
        <i class="k-icon k-icon-error"></i>
        {this.props.sourceTokenError}
      </div>)
    }
    return (
      <div class="input-group-item input-amount">
        <label>Exchange</label>
        <div class="input-item">
          <input value={toT(this.props.specifiedAmount)} type="number" min="0" step="any" placeholder="Amount to exchange" onChange={this.specifyAmount.bind(this)}/>
          <select class="selectric" onChange={this.selectToken.bind(this)} value={this.props.selectedToken}>
            <option key={constants.ETHER_ADDRESS} value={constants.ETHER_ADDRESS}>ETH</option>
            {tokenOptions}
          </select>
        </div>
        <div class="extra-info">
          Your balance: {toT(this.props.selectedTokenBalance)}
        </div>
        { error }
        { sourceTokenError }
      </div>
    )
  }
}
