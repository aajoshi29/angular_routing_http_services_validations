import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def products(request, prod_id=None):
    if request.method == 'GET':
        file = open('product/data.json', 'r')
        data = file.read()
        product_list = json.loads(data)
        file.close()
        if prod_id:
            for product in product_list:
                if product['ProductRowId'] == prod_id:
                    return JsonResponse(product, safe=False)
        if request.GET and request.GET['filterType'] and request.GET['filterText']:
            response = []
            for product in product_list:
                if product[request.GET['filterType']].lower() == request.GET['filterText'].lower():
                    response.append(product)
            return JsonResponse(response, safe=False)
        return JsonResponse(product_list, safe=False)

    if request.method == 'POST':
        file = open('product/data.json', 'r')
        data = file.read()
        file.close()
        product_list = json.loads(data)
        product_list.append(json.loads(request.body))
        file = open('product/data.json', 'w')
        file.write(json.dumps(product_list))
        file.close()
        return JsonResponse(product_list, safe=False)

    if request.method == 'PUT':
        file = open('product/data.json', 'r')
        data = file.read()
        file.close()
        product_list = json.loads(data)
        product_list = list(filter(lambda prod: prod['ProductRowId'] != prod_id, product_list))
        product_list.append(json.loads(request.body))
        file = open('product/data.json', 'w')
        file.write(json.dumps(product_list))
        file.close()
        return JsonResponse(product_list, safe=False)

    if request.method == 'DELETE':
        file = open('product/data.json', 'r')
        data = file.read()
        file.close()
        product_list = json.loads(data)
        product_list = list(filter(lambda prod: prod['ProductRowId'] != prod_id, product_list))
        file = open('product/data.json', 'w')
        file.write(json.dumps(product_list))
        file.close()
        return JsonResponse(product_list, safe=False)
