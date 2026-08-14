<?php

namespace App\Http\Controllers;

use App\Support\AdminCatalog;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageController extends Controller
{
    public function __invoke(): Response
    {
        $name = request()->route()?->getName();
        $page = AdminCatalog::pages()[$name] ?? abort(404);

        return Inertia::render('admin/page', [
            'title' => $page['title'],
            'group' => $page['group'],
            'description' => $page['description'],
            'breadcrumbs' => [
                [
                    'title' => $page['group'],
                    'href' => $page['href'],
                ],
                [
                    'title' => $page['title'],
                    'href' => $page['href'],
                ],
            ],
        ]);
    }
}
