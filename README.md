# Instagram

## Site URL : https://611b5aa1abe679c088c94c52--bj-instagram.netlify.app

### Description

```
  1. 인스타그램 디자인을 최대한 따라 만든 웹앱입니다.
  2. 백엔드는 따로 만들지 않고 파이어베이스를 통한 백엔드를 구현했습니다.
  3. 로그인,회원가입은 이메일과 facebook로그인으로 파이어베이스로 구현하였습니다.
  4. 실제 서비스 기능은 포스트 기능과 댓글기능 그리고 좋아요 및 팔로우 기능으로 만들었습니다.
  5. 리액트 베이스에 회원인증은 리덕스를 추가해주었고, 포스팅 기능은 useState를 활용하였습니다.
```

### 차후 보완해야 할 사항

```
  1. 이미지 로딩에 오랜시간이 걸린다. 따라서 이미지 리사이징을 통한 용량을 줄여 좀 더 로딩속도를 빠르게할 계획
```

    browser-image-compression 라이브러리를 통해 이미지를 업로드할때 압축시켜주는 작업을 하였다.
    그래서 2mb짜리 이미지가 250kb까지 줄어서 성능이 확보되었다.

    const options = {
    		maxSizeKB: 100,
    		maxWidthOrHeight: 615,
    	}; // 옵션을 주어서 사이즈와 용량을 맞춰준다.

    다중 파일 기준으로 작업하였다.
    for (let i = 0; i < fileArr.length; i += 1) {
    		const file = fileArr[i];
    		let promise;
      // 이미지 파일을 리사이징 해준다.
    		imageCompression(file, options).then((compressedFile) => {
    			newFileArr.push(compressedFile);
    			setImgFile([...newFileArr]);
        //리사이징 된 이미지를 url로 바꿔준다.
    			promise = imageCompression.getDataUrlFromFile(compressedFile);
    			promise.then((result) => {
    				newFileUrl.push(result);
    				setImgUrl([...newFileUrl]);
    			});
    		});
    	}

```
2. 개발자 도구에 source란에 내가 쓰는 소스가 그대로 드러난다. 이것 역시 고쳐봐야한다.
3. 검색시 실제 이름과 일치할때만 검색이 된다. 따라서 디바운스와 쓰로틀링을 통해 실시간으로 검색이 될 수 있게 바꿔보고 싶다.
```
