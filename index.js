function splitSMS(text, limit = 140) {
    function getServiceInfo(currentSMS, totalSMS) {
        return currentSMS + "/" + totalSMS
    }

    function reformatChunk(chunk, serviceInfo) {
        let resultChunk = ""
        let transferChunk = chunk

        for (let word of chunk.trim().split(" ")) {
            if (((resultChunk ? resultChunk + " " + word : word) + " " + serviceInfo).length <= limit) {
                resultChunk = resultChunk ? resultChunk + " " + word : word
                transferChunk = transferChunk.replace(word, '').trim();
            } else {
                resultChunk = resultChunk + " " + serviceInfo
                break;
            }
        }
        return [resultChunk, transferChunk]
    }

    function insertServiceInfo(arr) {
        const resultArr = []

        for (let index = 0; index < arr.length; index++) {
            if (!arr[index].trim()) break;
            const chunk = arr[index]
            const serviceInfo = getServiceInfo(index + 1, arr.length)
            const sms = chunk + " " + serviceInfo

            if (sms.length <= limit) {
                resultArr.push(sms)
            } else {
                const [newChunk, transferChunk] = reformatChunk(chunk, serviceInfo)
                resultArr.push(newChunk)

                if (transferChunk.trim()) {
                    arr[index + 1] = arr[index + 1] ? transferChunk + " " + arr[index + 1] : ""
                }
            }
        }

        return resultArr
    }

    function getSMSChunks(arr) {
        const resultArr = []
        let currentChunk = ''

        for (let [index, word] of arr.entries()) {
            if ((currentChunk + " " + word).length <= limit) {
                currentChunk = (currentChunk + " " + word).trim()
                if (index === arr.length - 1) {
                    resultArr.push(currentChunk)
                }
            } else {
                resultArr.push(currentChunk)
                currentChunk = word
            }
        }
        return resultArr
    }

    // empty input string === nothing to do there, return empty arr
    if (!text.trim()) return []

    // if text fits it one chunk, just return arr from it
    if (text.trim().length < limit) return text.trim()

    // otherwise, text is long enough to split it
    return insertServiceInfo(getSMSChunks(text.trim().split(" ")))
}
