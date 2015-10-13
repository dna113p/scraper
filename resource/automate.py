#!/usr/bin/python

import requests
import json
from bs4 import BeautifulSoup
from lxml import etree




cookies = {
'sid_customer_b6dab': '560e6b8f0ba0832128b2880d81da754e_1_C',
'sid_admin_b6dab': 'e3146243f1bd9194efdd6745af4f8f43_0_A',
'_ga': 'GA1.1.656842484.1437094543'
        }

url = "http://localhost/cscart/admin.php"
product = "?dispatch=products.update&product_id=623"
querystring = {"dispatch":"product_options.delete","option_id":"1087","product_id":"623"}
urlproduct = 'http://localhost/cscart/admin.php?dispatch=products.update&product_id=623'

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.13 Safari/537.36',
    }

# response = requests.request("POST", url, headers=headers, params=querystring, cookies=cookies)
response = requests.request("GET", urlproduct, headers=headers, cookies=cookies)
print response.status_code
soup = BeautifulSoup(response.text, 'html.parser')
print soup.title.text
print soup.h2.text
for a in soup.select('#product_options_list > table > tbody > tr > td > div > a'):
    print a.text

