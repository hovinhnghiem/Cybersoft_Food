import { getEle } from "./../controllers/main.js";

class Validation {
    checkEmpty(value, idNoti, mess) {

        if (value === "") {
            // show thông báo lỗi ra ngoài
            // tạo câu thông báo => gán ra ngoài thẻ inform
            getEle(idNoti).innerHTML = mess;

            // dom tới #id-inform => display: block
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;

    }

    checkCharacterLength(value, idNoti, mess, min, max) {
        if (min <= value.trim().length && value.trim.length <= max) {
            // show thông báo lỗi ra ngoài
            // tạo câu thông báo => gán ra ngoài thẻ inform
            getEle(idNoti).innerHTML = mess;

            // dom tới #id-inform => display: block
            getEle(idNoti).style.display = "block";
            return false;
        }

        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }


    checkString(value, idNoti, mess) {
        const letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkSelectOption(idSelect, idNoti, mess) {
        if (getEle(idSelect).selectedIndex != 0) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "block";
        return false;
    }

    checkIDExist(value, idNoti, mess, arr) {
        let isExist = false;
        for (let i = 0; i < arr.length; i++) {
            const food = arr[i];
            if (food.id === value) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            getEle(idNoti).innerHTML = mess;
            getEle(idNoti).style.display = "block";
            return false;
        }

        getEle(idNoti).innerHTML = mess;
        getEle(idNoti).style.display = "none";
        return true;
    }
}

export default Validation