import requests
from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import GeoInfo
import json
# Create your views here.


def getLatLng(address):
    result = ""

    url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address
    rest_api_key = '83e91879c197aec3b36cb5688f51dc16'
    header = {'Authorization': 'KakaoAK ' + rest_api_key}

    r = requests.get(url, headers=header)

    try:
        if r.status_code == 200:
            result_address = r.json()["documents"][0]["address"]

            result = result_address["y"], result_address["x"]
        else:
            result = "ERROR[" + str(r.status_code) + "]"
    except:
        result = "ERROR[" + str(r.status_code) + "]"

    return result


def getKakaoMapHtml(address_latlng):
    javascript_key = "3d078ce22dcc65c61c7dc5eab06112da"

    result = ""
    result = result + \
        "<div id='map' style='width:300px;height:200px;display:inline-block;'></div>" + "\n"
    result = result + "<script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=3d078ce22dcc65c61c7dc5eab06112da" + \
        javascript_key + "'></script>" + "\n"
    result = result + "<script>" + "\n"
    result = result + \
        "    var container = document.getElementById('map'); " + "\n"
    result = result + "    var options = {" + "\n"
    result = result + \
        "           center: new kakao.maps.LatLng(" + \
        address_latlng[0] + ", " + address_latlng[1] + ")," + "\n"
    result = result + "           level: 3" + "\n"
    result = result + "    }; " + "\n"
    result = result + \
        "    var map = new kakao.maps.Map(container, options); " + "\n"

    # 검색한 좌표의 마커 생성을 위해 추가
    result = result + \
        "    var markerPosition  = new kakao.maps.LatLng(" + \
        address_latlng[0] + ", " + address_latlng[1] + ");  " + "\n"
    result = result + \
        "    var marker = new kakao.maps.Marker({position: markerPosition}); " + "\n"
    result = result + "    marker.setMap(map); " + "\n"

    result = result + "</script>" + "\n"

    return result


@csrf_exempt
def home(request):
    address = "서울 강남구 선릉로 669"

    # 카카오 REST API로 좌표 구하기
    address_latlng = getLatLng(address)
    print("[address_latlng]:    ", address_latlng)
    # # geoInfo = GeoInfo()
    # # geoInfo.latitude =

    # # 좌표로 지도 첨부 HTML 생성
    # if str(address_latlng).find("ERROR") < 0:
    #     map_html = getKakaoMapHtml(address_latlng)

    #     print(map_html)
    # else:
    #     print("[ERROR]getLatLng")
    return render(request, 'example.html', {'lat': address_latlng[0], 'lon': address_latlng[1]})


@csrf_exempt
def infos(request):
    print(request.method)

    if request.method == 'GET':

        # var api_url = 'https://openapi.naver.com/v1/papago/n2mt'
        # var request = require('request')
        # var options = {
        #     url: api_url,
        #     form: {'source': 'en', 'target': 'ko', 'text': req.query.sourceText},
        #     headers: {'X-Naver-Client-Id': client_id,
        #               'X-Naver-Client-Secret': client_secret}
        # }
        # request.post(options, function(error, response, body) {
        #     if (!error & & response.statusCode == 200) {
        #         res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'})
        #         res.end(body)
        #     } else {
        #         res.status(response.statusCode).end()
        #         console.log('error = ' + response.statusCode)
        #     }
        # })

        # print(request.GET['sourceText'])
        # Data = request.GET['sourceText']
        Data = request.GET.get('sourceText')
        # print("getted Data : ", Data)
        key = request.GET.get('key')
        if key:
            print(key)
            if key == 'highlight':
                print("getted highlight Data : ", Data)
                return JsonResponse({'foo': 'bar'})

        address_latlng = getLatLng(Data)
        print("[address_latlng]:    ", address_latlng)
        if str(address_latlng).find("ERROR") < 0 and key == 'showmap':
            # return HttpResponseRedirect('https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d078ce22dcc65c61c7dc5eab06112da')
            return render(request, 'example.html', {'lat': address_latlng[0], 'lon': address_latlng[1]})
            # return render(request, 'example3.html', {'draggedText': Data})
        else:
            print("[ERROR]getLatLng")
            return render(request, 'example2.html')

        # print("[address_latlng]:    ", address_latlng)
        # return render(request, 'example.html', {'lat': address_latlng[0], 'lon': address_latlng[1]})

        # json_info = json.dumps(LOC_tags, ensure_ascii=False)
        # print(type(json_info))
        # print(json_info)
        # # return JsonResponse({
        # #     'message': '안녕 파이썬 장고',
        # #     'items': ['파이썬', '장고', 'AWS', 'Azure'],
        # # }, json_dumps_params={'ensure_ascii': True})
        # # return JsonResponse(json_info, safe=False)
        # # return HttpResponse("hi", status=200)
        return JsonResponse({'foo': 'bar'})
    elif request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        print(body["sourceText"])
        # print(request.POST.get("sourceText", ""))
        return JsonResponse({'foo33': 'bar33'})
        # body_ = request.POST.get('body')
        # body_ = request.POST['body']
        # print("body! : ", body_)
        # Data = request.POST.get('sourceText')
        # Data = request.POST['sourceText']
        # print("getted Data : ", Data)
        # key = request.POST.get('key')
        # key = request.POST['key']
        # if key:
        #     print(key)
        #     if key == 'highlight':
        #         print("getted highlight Data : ", Data)
        #         return JsonResponse({'foo': 'bar'})
        # else:
        #     return JsonResponse({'foo22': 'bar22'})
