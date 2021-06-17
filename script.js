// 컨텐츠 페이지의 user 입력된 값이 변경 되었을 '때'
// 컨텐츠 페이지에 몇개의 단어가 등장하는지 계산 해주세요
function matching(user) {
    chrome.tabs.executeScript({
        //컨텐트 페이지를 대상으로 하는 곳
        code: 'document.querySelector("body").innerText'
    }, function (result) {
        //위 코드가 실행된 후에 이 함수를 호출하고, 위의 값을 result에 담아라
        var bodyText = result[0];
        var bodyNum = bodyText.split(' ').length;
        var myNum = bodyText.match(new RegExp('\\b(' + user + ')\\b', 'gi')).length;
        var per = myNum / bodyNum * 100;
        per = per.toFixed(1);   //소숫점

        //팝업 페이지에 추가
        //id값이 result인 tag 하위에 결과를 추가한다.
        document.querySelector('#result').innerText = myNum + '/' + bodyNum + '/' + per;
    });
}

chrome.storage.sync.get(function(data){
    document.querySelector('#user').value = data.userWords;
    //팝업 페이지를 대상으로 하므로 
    //크롬 확장의 기능 중에 tab과 관련된 기능 중에 컨텐츠 페이지를 대상으로 코드를 실행
    matching(data.userWords);
})

// #user라는 id 값을 가지고 있는 text area에 값이 변경되었을 때 (addevent) 두번째 인자로 들어가는 함수 실행
document.querySelector('#user').addEventListener('change', function () {
    var user = document.querySelector('#user').value;
    // 이 값을 어디 저장했다가 나중에 세팅 해주면 된다
    // 크롬 스토리지에 저장
    chrome.storage.sync.set({
        userWords:user
    });

    matching(user);

})


