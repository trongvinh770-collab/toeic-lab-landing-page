document.addEventListener('DOMContentLoaded', function () {
    const courseSelect = document.getElementById('course-select');
    const customFeeGroup = document.getElementById('custom-fee-group');
    const customFeeInput = document.getElementById('custom-fee');
    const totalAmountSpan = document.getElementById('total-amount');
    const paymentForm = document.getElementById('payment-form');
    const studentNameInput = document.getElementById('student-name'); 

    // Danh sách học phí còn thiếu của sinh viên (đã thêm Hoàng Trọng Vĩnh)
    const studentFees = {
        'Hoàng Trọng Vĩnh': 1350000, // Học phí còn thiếu 1,350,000 VNĐ
        'Nguyễn Văn A': 2000000,
    };

    function updateTotal() {
        let total = 0;
        const selectedValue = courseSelect.value;

        if (selectedValue === 'custom') {
            customFeeGroup.style.display = 'block';
            total = parseInt(customFeeInput.value) || 0;
        } else {
            customFeeGroup.style.display = 'none';
            total = parseInt(selectedValue) || 0;
        }

        // Định dạng tiền tệ VNĐ
        totalAmountSpan.textContent = total.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    }

    function checkStudentFee() {
        // Lấy tên sinh viên và loại bỏ khoảng trắng thừa
        const inputName = studentNameInput.value.trim();

        if (studentFees.hasOwnProperty(inputName)) {
            const fee = studentFees[inputName];
            
            // 1. Đặt option thành 'Học phí khác'
            courseSelect.value = 'custom';
            
            // 2. Điền số tiền vào ô tự nhập
            customFeeInput.value = fee;
            
            // 3. Cập nhật tổng tiền
            updateTotal();
        } else if (courseSelect.value === 'custom' && customFeeInput.value !== '') {
             // Nếu tên không khớp nhưng đang ở chế độ custom, chỉ cập nhật tổng tiền
             updateTotal();
        } else {
            // Nếu tên không khớp và không ở chế độ custom, đặt lại về 0
            courseSelect.value = '0';
            customFeeInput.value = '';
            updateTotal();
        }
    }

    // Gắn sự kiện để kiểm tra tên sinh viên mỗi khi gõ
    studentNameInput.addEventListener('input', checkStudentFee);

    // Cập nhật tổng tiền khi thay đổi lựa chọn hoặc nhập số tiền
    courseSelect.addEventListener('change', updateTotal);
    customFeeInput.addEventListener('input', updateTotal);

    // Khởi tạo tổng tiền khi tải trang
    updateTotal();


    // Xử lý khi nhấn nút "Thanh toán" (Mô phỏng)
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const studentName = document.getElementById('student-name').value;
        const studentId = document.getElementById('student-id').value;
        const total = totalAmountSpan.textContent;

        if (total === '0 ₫') {
            alert('Vui lòng chọn khóa học hoặc nhập số tiền.');
            return;
        }

        alert(
            `CHUẨN BỊ THANH TOÁN:\n\n` +
            `Sinh viên: ${studentName}\n` +
            `Số điện thoại/Email: ${studentId}\n` +
            `Số tiền: ${total}\n\n` +
            `LƯU Ý: Đây chỉ là giao diện demo. \nTrong thực tế, trang web sẽ chuyển hướng bạn đến cổng thanh toán tại bước này.`
        );
    });
});