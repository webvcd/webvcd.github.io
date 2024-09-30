document.getElementById('submitBtn').addEventListener('click', function() {
    const udid = document.getElementById('udidInput').value;
    const loadingMessage = document.getElementById('loadingMessage');
    const resultDiv = document.getElementById('result');
    const deviceInfo = document.getElementById('deviceInfo');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.style.display = 'none';
    loadingMessage.style.display = 'block';
    resultDiv.style.display = 'none';
    deviceInfo.innerHTML = '';

    if (!udid) {
        loadingMessage.style.display = 'none';
        alertMessage.style.display = 'block';
        return;
    }

    const apiUrl = `https://udid.ahfi.cn/api/uid.php?udid=${encodeURIComponent(udid)}`;

    const fetchData = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    const results = [
                        "设备型号: " + data.data.model,
                        "设备编号: " + data.data.deviceNumber,
                        "设备平台: " + data.data.devicePlatform,
                        "设备类别: " + data.data.deviceClass
                    ];
                    showResultsWithAnimation(results);
                } else {
                    showResultsWithAnimation([data.message]);
                }
            })
            .catch(error => {
                console.error('请求出错:', error);
            });
    };

    setTimeout(() => {
        fetchData();
    }, 500);
});

function showResultsWithAnimation(results) {
    const loadingMessage = document.getElementById('loadingMessage');
    const resultDiv = document.getElementById('result');
    const deviceInfo = document.getElementById('deviceInfo');

    loadingMessage.style.display = 'none';
    resultDiv.classList.add('show');
    resultDiv.style.display = 'block';
    deviceInfo.innerHTML = '';

    results.forEach((line) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'device-info-line';
        lineElement.textContent = line;

        deviceInfo.appendChild(lineElement);

        setTimeout(() => {
            lineElement.style.opacity = 1;
        }, 100);
    });
}

document.getElementById('currentYear').textContent = new Date().getFullYear();
