// store user data in local storage

export const storeUserData = (userData: any) => {
    localStorage.setItem("userData", JSON.stringify(userData));
}

export const storeTxns = (txns: any) => {
    localStorage.setItem("txns", JSON.stringify(txns));
}



