// 2412.8万 to 24128000
export const toNumber = (value: any) => {
    const units = ['万', '亿']
    if (!value) {
        return
    }
    if (units.includes(value.slice(-1))) {
        if (value.slice(-1) === '亿'){
            return Number(value.slice(0, -1)) * 100000000
        }
        return Number(value.slice(0, -1)) * 10000
    }
    return Number(value)
}
