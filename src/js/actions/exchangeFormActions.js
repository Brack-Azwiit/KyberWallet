import store from '../store'


export function selectAccount(id, addr) {
  return {
    type: "ACCOUNT_SELECTED",
    payload: addr,
    meta: id,
  }
}

export function selectSourceToken(id, addr) {
  return {
    type: "SOURCE_TOKEN_SELECTED",
    payload: addr,
    meta: id,
  }
}

export function specifySourceAmount(id, amount) {
  return {
    type: "SOURCE_AMOUNT_SPECIFIED",
    payload: amount,
    meta: id,
  }
}

export function selectDestToken(id, addr) {
  return {
    type: "DEST_TOKEN_SELECTED",
    payload: addr,
    meta: id,
  }
}

export function specifyMinRate(id, rate) {
  return {
    type: "MIN_CONVERSION_RATE_SPECIFIED",
    payload: rate,
    meta: id,
  }
}

export function specifyMinAmount(id, amount) {
  return {
    type: "MIN_AMOUNT_SPECIFIED",
    payload: amount,
    meta: id,
  }
}

export function specifyRecipient(id, addr) {
  return {
    type: "RECIPIENT_SPECIFIED",
    payload: addr,
    meta: id,
  }
}
export function specifyMessage(id, message) {
  return {
    type: "MESSAGE_SPECIFIED",
    payload: message,
    meta: id,
  }
}

export function specifyGasLimit(id, gas) {
  return {
    type: "GAS_SPECIFIED",
    payload: gas,
    meta: id,
  }
}

export function specifyGasPrice(id, price) {
  return {
    type: "GAS_PRICE_SPECIFIED",
    payload: price,
    meta: id,
  }
}

export function throwError(id, errors) {
  return {
    type: "ERROR_THREW",
    payload: errors,
    meta: id,
  }
}

export function emptyForm(id) {
  return {
    type: "EXCHANGE_FORM_EMPTIED",
    meta: id,
  }
}

export function resetStep(id) {
  return {
    type: "EXCHANGE_FORM_RESET_STEP",
    meta: id,
  }
}

export function nextStep(id) {
  return {
    type: "EXCHANGE_FORM_NEXT_STEP",
    meta: id,
  }
}

export function specifyStep(id, step) {
  return {
    type: "EXCHANGE_FORM_STEP_SPECIFIED",
    payload: step,
    meta: id,
  }
}

export function previousStep(id) {
  return {
    type: "EXCHANGE_FORM_PREVIOUS_STEP",
    meta: id,
  }
}

export function suggestRate(id, epsilon) {
  var exchange = store.getState().exchangeForm[id]
  var source = exchange.sourceToken
  var dest = exchange.destToken
  var rate = store.getState().global.rates[source + "-" + dest]
  if (rate) {
    var bigRate = rate.rate
    if (epsilon) {
      bigRate = bigRate.times(1-epsilon)
    }
    return {
      type: "EXCHANGE_FORM_SUGGEST_RATE",
      payload: {
        rate: bigRate.toString(10),
        reserve: rate.reserve,
        expirationBlock: rate.expirationBlock,
        balance: rate.balance.toString(10),
      },
      meta: id,
    }
  } else {
    return {
      type: "EXCHANGE_FORM_SUGGEST_RATE",
      payload: {
        rate: 0,
        expirationBlock: 0,
        balance: 0,
        reserve: 0,
      },
      meta: id,
    }
  }
}

export function doApprovalTransaction(id, ethereum, tx, callback) {
  return {
    type: "EXCHANGE_FORM_APPROVAL_TX_BROADCAST",
    payload: new Promise((resolve, reject) => {
      ethereum.sendRawTransaction(tx, (hash) => {
        callback(hash)
        resolve(hash)
      }, (error) => {
        reject(error)
      })
    }),
    meta: id,
  }
}

export function selectCrossSend(id) {
  return {
    type: "CROSS_SEND_SELECTED",
    meta: id,
  }
}

export function deselectCrossSend(id) {
  return {
    type: "CROSS_SEND_DESELECTED",
    meta: id,
  }
}

export function selectAdvance(id) {
  return {
    type: "ADVANCE_SELECTED",
    meta: id,
  }
}

export function deselectAdvance(id) {
  return {
    type: "ADVANCE_DESELECTED",
    meta: id,
  }
}

export function doTransaction(id, ethereum, tx, callback) {
  return {
    type: "EXCHANGE_FORM_TX_BROADCAST",
    payload: new Promise((resolve, reject) => {
      ethereum.sendRawTransaction(tx, (hash) => {
        callback(hash, tx)
        resolve(hash)
      }, (error) => {
        reject(error)
      })
    }),
    meta: id,
  }
}
