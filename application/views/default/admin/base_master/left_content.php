<div class="side-options">
    <ul>
        <li>
            <a href="#" id="collapse-nav" class="act act-primary tip" title="Ẩn">
                <i class="icon16 i-arrow-left-7"></i>
            </a>
        </li>
    </ul>
</div>
<div class="sidebar-wrapper">
    <nav id="mainnav">
        <ul class="nav nav-list">
            <?php
            renderCategory($menu_data);

            function renderCategory($categoryList) {
                ?>
                <?php foreach ($categoryList as $item) { ?>
                    <li>
                        <a class="<?php echo isset($item["class"]) ? $item["class"] : ''; ?>" href="<?php echo (!isset($item["child"]) || !$item["child"] || !count($item["child"])) ? $item["url"] : "#"; ?>" title="<?php echo $item["text"] ?>">
                            <span class="icon">
                                <i class="icon20 <?php echo $item["icon"] ?>"></i>
                            </span>
                            <span class="txt"><?php echo $item["text"] ?></span>
                            <?php if (isset($item["child"]) && $item["child"] && count($item["child"]) > 0) { ?>
                                <ul class="sub">
                                    <?php renderCategory($item["child"]); ?>
                                </ul>
                            <?php } ?>
                        </a>
                    <?php }
                } ?>
            </li>
        </ul>
    </nav>
</div>