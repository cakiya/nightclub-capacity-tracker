from flask_restful import Resource, reqparse

from flask_restful import request
from .swen_344_db_utils import *

import logging

logging.basicConfig(level=logging.INFO)

class ClubsApi(Resource):
    def get(self):
    # NOTE: No need to replicate code; use the util function!
        result = exec_get_all("SELECT * FROM clubs ORDER BY id")
        return result
    
    def put(self):
        # give an individual club to update
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('location', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('max', type=str)
        parser.add_argument('warning', type=str)
        parser.add_argument('count', type=str)
        args = parser.parse_args()
        name = args['name']
        location = args['location']
        genre = args['genre']
        max = args['max']
        warning = args['warning']
        count = args['count']
        logging.info("PUT UPDATING A CLUB"+name+location+genre+max+warning+count)
        exec_commit("""
            UPDATE clubs
            SET name = %s, 
                location = %s,
                genre = %s,
                max = %s,
                warning = %s,
                count = %s
            WHERE name = %s
            """, (name, location, genre, max, warning, count, name))
        return exec_get_all("SELECT * FROM clubs ORDER BY id")
    
    def post(self):
        # give an individual club to add
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('location', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('max', type=str)
        parser.add_argument('warning', type=str)
        parser.add_argument('count', type=str)
        args = parser.parse_args()
        name = args['name']
        location = args['location']
        genre = args['genre']
        max = args['max']
        warning = args['warning']
        count = args['count']
        logging.info("POST ADDING A CLUB"+name+location+genre+max+warning+count)
        exec_commit("""
            INSERT INTO clubs (name, location, genre, max, warning, count)
            VALUES (%s,%s,%s,%s,%s,%s);
            """, (name, location, genre, max, warning, count))
        return exec_get_all("SELECT * FROM clubs ORDER BY id")
    
    def delete(self):
        name = request.args.get('name', default=None)
        logging.info("DELETE A CLUB"+name)
        exec_commit("""
            DELETE FROM clubs 
            WHERE name=%s;
            """, (name,))
        return exec_get_all("SELECT * FROM clubs ORDER BY id")


